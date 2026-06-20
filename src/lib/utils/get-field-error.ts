export default function getFieldErrorMessage(
  errors: ReadonlyArray<{ message?: string } | undefined>,
): string | undefined {
  return errors[0]?.message;
}
