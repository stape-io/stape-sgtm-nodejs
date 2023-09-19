interface TransformationType {
  trim(value: string): string,
  base64(value: string): string,
  sha256base64(value: string): string,
  sha256hex(value: string): string,
  md5(value: string): string,
  toLowerCase(value: string): string,
}

export default TransformationType;