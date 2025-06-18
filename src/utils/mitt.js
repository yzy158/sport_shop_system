import mitt from "mitt";
const bus = mitt();
export default bus;  // 默认导出
export { bus };      // 命名导出