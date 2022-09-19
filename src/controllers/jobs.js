const Prisma = require('@prisma/client')
const { response } = require('express')
const validator = require('validator')

const { PrismaClient } = Prisma
const prisma = new PrismaClient()

const postJob = async ({ body: jobData, user }, res) => {
  if (
    !validator.isEmail(jobData.contactEmail) ||
    !validator.normalizeEmail(jobData.contactEmail)
  ) {
    return res.status(400).json('Invalid email was provided.')
  }

  const {
    _max: { order },
  } = await prisma.job.aggregate({
    _max: {
      order: true,
    },
  })
  try {
    const job = await prisma.job.create({
      data: {
        ...jobData,
        deadline: new Date(jobData.deadline),
        order: order ? order + 1 : 1,
        creatorId: user.id,
      },
      include: {
        creator: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    })

    return res.status(201).json(job)
  } catch (error) {
    return res.status(500).json([])
  }
}

const archiveJob = async ({ params: { id } }, res) => {
  try {
    const job = await prisma.job.update({
      where: {
        id: parseInt(id),
      },
      data: {
        isArchived: true,
      },
    })

    return res.json(job)
  } catch {
    return res.send(404)
  }
}

const getJobs = async (req, res) => {
  const jobs = await prisma.job.findMany({
    where: { isArchived: false },
    orderBy: [{ order: 'asc' }],
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      applicants: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  })

  return res.send(jobs)
}

const markJob = async (
  { user: { id: userId, role }, params: { id: jobId } },
  res
) => {
  const markedJob = await prisma.job.findFirst({
    where: {
      id: parseInt(jobId),
      isArchived: false,
      applicants: {
        some: {
          userId: userId,
          jobId: parseInt(jobId),
        },
      },
    },
  })

  if (markedJob) {
    return res.status(400).send('Already marked.')
  }

  if (role === 'applicant') {
    try {
      const job = await prisma.job.update({
        where: {
          id: parseInt(jobId),
          isArchived: false,
        },
        data: {
          applicants: {
            createMany: {
              data: [{ userId }],
            },
          },
        },
      })

      return res.send(job)
    } catch (error) {
      return res.status(404).send('Not found')
    }
  } else {
    return res.status(401).send('Unauthorized action.')
  }
}

const updateOrder = async (
  { body: { id: destinationId }, params: { id } },
  res
) => {
  try {
    let firstOrderValue = 0,
      targetOrderValue = 0

    if (destinationId > 0) {
      const prevJob = await prisma.job.findFirst({
        where: { id: destinationId },
      })

      firstOrderValue = prevJob.order
    }

    const nextJob = await prisma.job.findFirst({
      orderBy: [{ order: 'asc' }],
      where: {
        order: {
          gt: firstOrderValue,
        },
      },
    })

    if (!nextJob) {
      const {
        _max: { order: maxOrderValue },
      } = await prisma.job.aggregate({
        _max: {
          order: true,
        },
      })

      targetOrderValue = maxOrderValue + 1
    } else {
      targetOrderValue = (firstOrderValue + nextJob.order) / 2
    }

    await prisma.job.update({
      where: {
        id: parseInt(id),
      },
      data: {
        order: targetOrderValue,
      },
    })

    const jobs = await prisma.job.findMany({
      where: { isArchived: false },
      orderBy: [{ order: 'asc' }],
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        applicants: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    return res.send(jobs)
  } catch (error) {
    return res.status(404).send('Not found')
  }
}

module.exports = {
  postJob,
  archiveJob,
  getJobs,
  markJob,
  updateOrder,
}
