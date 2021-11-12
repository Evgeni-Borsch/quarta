import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { getJobs, getJobsFilters } from '~/services/api/jobs'
import { API_BASE_URL } from '~/services/constants'

export interface JobItem {
  raw: any

  id: string
  title: string
  image: string
  text: string

  tags: Array<string>
  address: string
  city: string
}

@Module({
  name: 'jobs',
  stateFactory: true,
  namespaced: true,
})
export default class JobsModule extends VuexModule {
  items: Array<JobItem> = []

  // get getByCode() {
  //   return (code: string) => {
  //     return this.items.find((item) => item.code === code)
  //   }
  // }

  @Action
  async fetch() {
    const jobs: Array<JobItem> = []
    const response = await getJobs({})

    console.log(await getJobsFilters())

    response.ITEMS.forEach((item) => {
      jobs.push({
        raw: item,
        id: item.ID,
        title: item.FIELDS.NAME,
        text: item.FIELDS.PREVIEW_TEXT,
        image: API_BASE_URL + item.FIELDS.PREVIEW_PICTURE.SRC,
        tags: item.PROPERTIES.TAGS.VALUE ?? [],
        address: item.PROPERTIES.ADDRESS.VALUE,
        city: item.PROPERTIES.CITY.VALUE,
      })
    })

    this.setItems(jobs)
  }

  @Mutation
  setItems(items: Array<JobItem>) {
    this.items = items
  }
}
