import { A } from './engine.js'

// نمای مستقل هر «صفحه» (app / web / wg): state ناوبری و ورود جدا، داده‌ها مشترک
export const surfView = (S, id, extra) => ({
  ...S,
  b: S.surf[id],
  flow: S.flow && S.flow.surf === id ? S.flow : null,
  ...extra,
})

export const focusProps = (id) => ({
  onClickCapture: () => A.focus(id),
  onKeyDownCapture: () => A.focus(id),
  onFocusCapture: () => A.focus(id),
})
