import QueryString from 'qs'
import { JobsFilterResponse, JobsResponse } from './model'
import { API_BASE_URL } from '~/services/constants'
import { getStore } from '~/store'

export * from './model'

export async function getJobsFilters(): Promise<JobsFilterResponse> {
  const { $axios } = getStore()

  return await $axios.$get(`${API_BASE_URL}/api/about/vacanciesfilter.php`)
}

export async function getJobs(filters: {
  [filterId: string]: string | number
}): Promise<JobsResponse> {
  const { $axios } = getStore()

  return await $axios.$get(
    `${API_BASE_URL}/api/about/vacancies.php?${QueryString.stringify(
      filters
    )}`
  )
}
