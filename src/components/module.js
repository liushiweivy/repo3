import indexesSearchInput from "@/components/searchHander/indexesSearchInput"
import reviewContainer from "@/components/review-container/reviewContainer"
import viewHeader from "@/components/review-container/pageView/viewHeader"
import viewContent from "@/components/review-container/pageView/viewContent"
import viewFooter from "@/components/review-container/pageView/viewFooter"
import viewModel from "@/components/review-container/pageView/viewModel"
import filtrateView from "@/components/filtrateDrawer/filtrateView/filtrateView"
import filtrateContent from "@/components/filtrateDrawer/filtrateView/filtrateBlock/filtrateContent"
import filtrateFooter from "@/components/filtrateDrawer/filtrateView/filtrateBlock/filtrateFooter"
import filtrateIndexes from "@/components/filtrateDrawer/filtrateComponents/filtrateIndexes"
import filtrateSelect from "@/components/filtrateDrawer/filtrateComponents/filtrateSelect"
import filtrateDateRange from "@/components/filtrateDrawer/filtrateComponents/filtrateDateRange"
import filtrateCheckbox from "@/components/filtrateDrawer/filtrateComponents/filtrateCheckbox"
import filtrateNumberRange from "@/components/filtrateDrawer/filtrateComponents/filtrateNumberRange"
import filtrateComplex from '@/components/filtrateDrawer/filtrateComponents/filtrateComplex'
import drawerView from "@/components/drawerView/drawerView"
import descriptionContainer from "@/components/description/descriptionContainer"
import descriptionTab from "@/components/description/descriptionTab/descriptionTab"
import flowTitle from '@/components/columns-row-tempalte/flow-title/flow-title'
import rowRadio from '@/components/columns-row-tempalte/row-radio/row-radio'
import rowBtnGroup from '@/components/columns-row-tempalte/row-btn-group/row-btn-group'
import rowBtn from '@/components/columns-row-tempalte/row-btn-group/row-btn/row-btn'
import pageEmpty from '@/components/page-empty/page-empty'
import dialogView from "@/components/dialogView/dialogView"
import dialogHeader from "@/components/dialogView/dialog-header/dialog-header"
import textHidden from "@/components/columns-row-tempalte/textHidden/textHidden"
import lineBlockTitle from "@/components/form-template/line-block-title/lineBlockTitle"
import uploadList from "@/components/form-template/upload-list/uploadList"
import formTextarea from "@/components/form-template/form-textarea/formTextarea"
import complexInput from "@/components/form-template/complexInput/complexInput"
import deptSelect from "@/components/form-template/deptSelect/deptSelect"
import complexSelects from "@/components/form-template/complexSelects/complexSelects"
export const module = {
        install:Vue =>{
                Vue.component('indexesSearchInput',indexesSearchInput)
                Vue.component('reviewContainer',reviewContainer)
                Vue.component('viewHeader',viewHeader)
                Vue.component('viewContent',viewContent)
                Vue.component('viewFooter',viewFooter)
                Vue.component('viewModel',viewModel)
                Vue.component('filtrateView',filtrateView)
                Vue.component('filtrateContent',filtrateContent)
                Vue.component('filtrateFooter',filtrateFooter)
                Vue.component('filtrateIndexes',filtrateIndexes)
                Vue.component('filtrateSelect',filtrateSelect)
                Vue.component('filtrateDateRange',filtrateDateRange)
                Vue.component('filtrateCheckbox',filtrateCheckbox)
                Vue.component('filtrateNumberRange',filtrateNumberRange)
                Vue.component('filtrateComplex',filtrateComplex)
                Vue.component('drawerView',drawerView)
                Vue.component('descriptionContainer',descriptionContainer)
                Vue.component('descriptionTab',descriptionTab)
                Vue.component('flowTitle',flowTitle)
                Vue.component('pageEmpty',pageEmpty)
                Vue.component('dialogView',dialogView)
                Vue.component('dialogHeader',dialogHeader)
                Vue.component('rowRadio',rowRadio)
                Vue.component('textHidden',textHidden)
                Vue.component('rowBtnGroup',rowBtnGroup)
                Vue.component('rowBtn',rowBtn)
                Vue.component('lineBlockTitle',lineBlockTitle)
                Vue.component('uploadList',uploadList)
                Vue.component('formTextarea',formTextarea)
                Vue.component('complexInput',complexInput)
                Vue.component('deptSelect',deptSelect)
                Vue.component('complexSelects',complexSelects)
        }
}
