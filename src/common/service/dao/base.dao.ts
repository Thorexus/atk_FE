export default interface BaseDAO<T> {
  getBodyJSON: () => T;
}
