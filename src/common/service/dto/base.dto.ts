export default interface BaseDTO {
  getBodyJSON: () => Record<string, unknown>;
}
