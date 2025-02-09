<script setup lang="ts">
import BaseHint from '@/components/BaseHint.vue'

import { computed, nextTick, ref } from 'vue'
import { useNewArticle } from '../hooks/use-new-article'
import { openConfirmModal } from '@/utils/messages'

defineProps<{
  /** 标题节点 */
  titleRef?: HTMLElement
}>()

const newArticle = useNewArticle()

/** 切换书写/预览模式用标志 */
const showReview = ref<boolean>(false)

const submitArticle = async () => {
  openConfirmModal(newArticle.submitArticle)
}

const creater = ref<HTMLDivElement>()
const textarea = ref<HTMLTextAreaElement>()

/** 切换更改书写/预览模式时的焦点 */
const switchFocus = () => {
  // 修改 showReview 导致 DOM 更新后无法立刻获取到 textarea 的 DOM，
  // 因此使用 nextTick 确保在画面更新后再对 DOM 进行操作。
  nextTick(() => {
    if (showReview.value) {
      creater.value?.focus()
    } else {
      textarea.value?.focus()
    }
  })
}

/** 切换书写/预览模式 */
const switchReview = () => {
  showReview.value = !showReview.value
  switchFocus()
}

/** 预览按钮文字 */
const reviewButtonText = computed<string>(() =>
  showReview.value ? '书写' : '预览',
)

const handleKeydown = (event: KeyboardEvent) => {
  // 允许 Ctrl + P 来切换书写和预览
  if (event.ctrlKey && event.key === 'p') {
    event.preventDefault()
    switchReview()
  }

  // 允许 Ctrl + Enter 提交主题
  if (event.ctrlKey && event.key === 'Enter') {
    submitArticle()
  }
}

const hint = [
  '<Tab>: 书写标题或正文时可在二者之间切换聚焦',
  '<C-P>: 书写正文时可切换书写和预览',
  '<C-Enter>: 书写正文时可提交主题',
].join('\n')

defineExpose({ bodyRef: textarea })
</script>

<template>
  <div
    class="article-topic-creater"
    ref="creater"
    tabindex="0"
    @keydown="handleKeydown"
  >
    <div class="button-group">
      <div>
        <button @click="switchReview">{{ reviewButtonText }}</button>
        <BaseHint margin-left="0.8rem" scale="0.7" :hint="hint" />
      </div>

      <button @click="submitArticle">提交主题</button>
    </div>

    <textarea
      ref="textarea"
      v-tabdown="titleRef"
      v-show="!showReview"
      v-model="newArticle.source"
      class="global-block-wrapper article"
    />

    <p
      v-show="showReview"
      v-html="newArticle.rendered"
      class="global-block-wrapper article markdown-body"
    />
  </div>
</template>

<style scoped>
.article-topic-creater {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 1.5rem 0 0;
  outline: none;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.button-group button {
  font-size: 1rem;
  height: 2rem;
  width: 6rem;
}

.article {
  border: unset;
  flex: 1;
  margin: 1rem 0 0;
  resize: none;
}
</style>
