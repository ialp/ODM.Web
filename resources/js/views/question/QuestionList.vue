<!--
  -  Bu yazılım Elektrik Elektronik Teknolojileri Alanı/Elektrik Öğretmeni Hakan GÜLEN tarafından geliştirilmiş olup
  -  geliştirilen bütün kaynak kodlar
  -  Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) ile lisanslanmıştır.
  -   Ayrıntılı lisans bilgisi için https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.tr sayfasını ziyaret edebilirsiniz.2019
  -->

<template>
  <section class="content">
    <!--    <loading-->
    <!--      :active.sync="isLoading"-->
    <!--      :is-full-page="true"-->
    <!--      :height="128"-->
    <!--      :width="128"-->
    <!--      :color="color"-->
    <!--      :loader="loader"-->
    <!--    >-->
    <!--      <h3 v-if="useSlot">-->
    <!--        Loading ...-->
    <!--      </h3>-->
    <!--    </loading>-->
    <div class="row">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header with-border">
            <h4>Soru Listeleme</h4>
          </div>
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
                <div
                  v-if="$isInRole('admin')"
                  class="col-md-4"
                >
                  <div
                    class="form-group has-feedback"
                    :class="{'has-error': errors.has('selectedBranch')}"
                  >
                    <label>Ders/Alan Seçiniz</label>
                    <v-select
                      v-model="selectedBranch"
                      v-validate="'required'"
                      :options="branches"
                      :reduce="branch => branch.id"
                      label="name"
                      name="selectedBranch"
                      placeholder="Alan/Dersi seçiniz"
                    >
                      <div slot="no-options">
                        Burada bişey bulamadık :-(
                      </div>
                    </v-select>
                    <span
                      v-if="errors.has('selectedBranch')"
                      class="help-block"
                    >{{ errors.first('selectedBranch') }}</span>
                    <!--          <input v-model="branch_id" type="text" class="form-control" placeholder="Branş Seçimi">-->
                    <!--          <span class="glyphicon glyphicon-barcode form-control-feedback"></span>-->
                  </div>
                </div>
                <div class="col-md-4">
                  <div
                    class="form-group has-feedback"
                    :class="{'has-error': errors.has('selectedClassLevel')}"
                  >
                    <label>Sınıf Seviyesi Seçiniz</label>
                    <v-select
                      v-model="selectedClassLevel"
                      v-validate="'required'"
                      :options="classLevels"
                      name="selectedClassLevel"
                      placeholder="Sınıf seviyesini seçiniz"
                    >
                      <div slot="no-options">
                        Burada bişey bulamadık :-(
                      </div>
                    </v-select>
                    <span
                      v-if="errors.has('selectedClassLevel')"
                      class="help-block"
                    >{{ errors.first('selectedClassLevel') }}</span>
                    <!--          <input v-model="branch_id" type="text" class="form-control" placeholder="Branş Seçimi">-->
                    <!--          <span class="glyphicon glyphicon-barcode form-control-feedback"></span>-->
                  </div>
                </div>
                <div class="col-md-4">
                  <div
                    class="form-group has-feedback"
                    :class="{'has-error': errors.has('searchedContent')}"
                  >
                    <label>Arama metni (Enter ile arayabilirsiniz)</label>
                    <input
                      v-model="searchedContent"
                      v-validate="'required'"
                      name="searchedContent"
                      type="text"
                      class="form-control"
                      placeholder="Metni girin ve ⏎ tuşuna basın"
                      @keypress.enter="searchQuestions"
                    >
                    <span class="mdi mdi-search-web form-control-feedback" />
                    <span
                      v-if="errors.has('searchedContent')"
                      class="help-block"
                    >{{ errors.first('searchedContent') }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div
                  v-if="questionsGroup === null || questionsGroup.length <= 0"
                  class="row"
                >
                  <div class="col-md-12">
                    <h4>Burada henüz bir şey bulamadık!</h4>
                  </div>
                </div>
                <div
                  v-for="ques in questionsGroup"
                  v-else
                  class="row"
                >
                  <div
                    v-for="b in ques"
                    :key="b.id"
                    class="col-md-4"
                  >
                    <!-- Widget: user widget style 1 -->
                    <div class="box box-widget widget-user-2">
                      <!-- Add the bg color to the header using any of the bg-* classes -->
                      <div
                        class="widget-user-header"
                        :class="colors[Math.floor(Math.random() * colors.length)]"
                      >
                        <!-- /.widget-user-image -->
                        <h3>{{ b.code }}</h3>
                        <h4>{{ b.content }}</h4>
                        <h5>{{ b.keywords }}</h5>
                        <!--                    <h5>{{ b.code }}</h5>-->
                      </div>
                      <div class="box-footer no-padding">
                        <ul class="nav nav-stacked">
                          <li>
                            <router-link :to="{ name: 'showQuestion', params: { questionId: b.id }}">
                              İncele
                            </router-link>
                          </li>
                          <li v-if="$isInRole('admin') || ($isInRole('elector') && userId !== b.creator_id)">
                            <router-link :to="{ name: 'questionEvaluation', params: { questionId: b.id }}">
                              Değerlendir
                            </router-link>
                          </li>
                          <!--                        <li><a href="#">Öğretmen Sayısı <span class="pull-right badge bg-aqua">{{ b.userCount }}</span></a></li>-->
                          <!--                      <li><a href="#">Completed Projects <span class="pull-right badge bg-green">12</span></a></li>-->
                          <!--                      <li><a href="#">Followers <span class="pull-right badge bg-red">842</span></a></li>-->
                        </ul>
                      </div>
                    </div>
                    <!-- /.widget-user -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

import chunk from 'lodash/chunk'
import range from 'lodash/range'
import vSelect from 'vue-select'
import BranchService from '../../services/BranchService'
import QuestionService from '../../services/QuestionService'
import Messenger from '../../helpers/messenger'
import { MessengerConstants } from '../../helpers/constants'
import AuthService from '../../services/AuthService'

export default {
  name: 'QuestionList',
  components: {
    vSelect
  },
  data () {
    return {
      isLoading: false,
      loader: 'spinner',
      color: '#007bff',
      userId: '',
      branches: [],
      selectedBranch: '',
      classLevels: range(4, 13),
      selectedClassLevel: null,
      searchedContent: null,
      questionsGroup: [],
      colors: ['bg-yellow', 'bg-green', 'bg-yellow', 'bg-red', 'bg-aqua', 'bg-purple', 'bg-blue', 'bg-teal', 'bg-maroon', 'bg-gray', 'bg-olive', 'bg-orange', 'bg-fuchsia']
    }
  },
  beforeRouteEnter (to, from, next) {
    Promise.all([BranchService.getBranches(), QuestionService.getLastSavedQuestions(30)])
      .then(([branches, questions]) => {
        next(vm => {
          vm.questionsGroup = chunk(questions, 3)
          vm.branches = branches
          vm.userId = AuthService.getUserId()
        })
      })
      .catch(err => Messenger.showError(err.message))
  },
  methods: {
    searchQuestions () {
      this.$validator.validateAll()
        .then(value => {
          if (value) {
          // this.isLoading = true
            const loader = this.$loading.show()
            const params = {
              branchId: this.selectedBranch,
              classLevel: this.selectedClassLevel,
              searchedContent: this.searchedContent
            }
            QuestionService.searchQuestion(params)
              .then(res => {
                this.questionsGroup = chunk(res, 3)
                // this.isLoading = false
                loader.hide()
              })
              .catch(e => {
                Messenger.showError(MessengerConstants.errorMessage)
                // this.isLoading = false
                loader.hide()
              })
          }
        })
    }
  }
}
</script>

<style lang="sass">
  @import '~vue-select/dist/vue-select.css'
</style>
