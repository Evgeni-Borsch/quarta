<template>
  <div class="jobs">
    <BreadcrumbsVue :path="breadcrumbs" />
    <div class="container">
      <h1>Вакансии</h1>

      <div class="jobs__filters">
        <SelectVue size="small" :options="options" :multiple="true" />
      </div>

      <div v-if="jobs.length">
        <div
          v-for="job of jobs"
          :key="job.id"
          class="jobs__item card my-5 border-0"
        >
          <div class="card-body">
            <div class="row mb-5">
              <div class="col-6">
                {{ job.city }}
                <LocationIcon
                  class="icon ms-5 me-2"
                  style="transform: translateY(-1px)"
                />{{ job.address }}
              </div>
              <div v-for="(tag, i) of job.tags" :key="i" class="col pe-5">
                {{ tag }}
              </div>
            </div>
            <div class="row">
              <div class="col-4 jobs__item-body">
                <h4>
                  {{ job.title }}
                </h4>
                <p>
                  {{ job.text }}
                </p>

                <div class="jobs__item-actions">
                  <a class="btn btn-light px-4 me-2">Читать подробнее</a>
                  <a class="btn btn-primary px-4">Откликнуться</a>
                </div>
              </div>
              <div class="col-2"></div>
              <div class="col-6">
                <figure class="jobs__item-image">
                  <img :src="job.image" :alt="job.title" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoadingVue v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { INDEX_PAGE } from '../index.vue'
import { getJobs } from '~/services/api/jobs'
import { API_BASE_URL } from '~/services/constants'

import LocationIcon from '~/assets/icons/location.svg?icon'
import { Page, SelectOption } from '~/models/general'
import BreadcrumbsVue from '~/components/Breadcrumbs.vue'
import LoadingVue from '~/components/Loading.vue'
import { jobs } from '~/store'
import SelectVue from '~/components/inputs/Select.vue'

export const JOBS_PAGE: Page = {
  title: 'Вакансии',
  slug: 'jobs',
  path: '/jobs'
}

@Component({
  components: { BreadcrumbsVue, LoadingVue, LocationIcon, SelectVue }
})
export default class JobsPage extends Vue {
  breadcrumbs: Array<Page> = [INDEX_PAGE, JOBS_PAGE]

  hasFetch = false

  options: Array<SelectOption> = [
    {
      value: 'rwerwerw',
      title: 'tsets'
    }
  ]

  get jobs() {
    return jobs.items
  }

  async fetch() {
    await jobs.fetch()
    this.hasFetch = true
  }
}
</script>

<style lang="scss" scoped>
.jobs {
  background-color: $gray-100;
  padding-bottom: 8.75rem;

  &__item {
    font-size: 1rem;

    .card-body {
      p {
        font-size: 1rem;
        font-weight: 500;
        color: $dark;
      }
    }
  }

  &__item-body {
    display: flex;
    flex-direction: column;
  }

  &__item-actions {
    justify-self: flex-end;
    margin-top: auto;
  }

  &__item-image {
    img {
      border-radius: $border-radius-lg;
      max-width: 100%;
    }
  }
}
</style>
