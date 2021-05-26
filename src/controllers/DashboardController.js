const Job = require('../model/Job')
const JobUtils = require('../utils/jobUtils')
const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {

        const jobs = Job.get()
        const profile = Profile.get()

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {

            const remaining = JobUtils.remainingDays(job)

            const status = remaining <= 0 ? 'done' : 'progress'

            statusCount[status] += 1

            if(status == 'progress') {
            jobTotalHours += Number(job['daily-hours'])
            }

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        //qtd de horas que quero trabalhar por dia MENOS a qtd de horas/dia de cada job in progress
        const freeHours = profile["hours-per-day"] - jobTotalHours

        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })

    }
}