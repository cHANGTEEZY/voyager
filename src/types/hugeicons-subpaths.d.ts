type HugeiconsSvgObject =
  | ([string, { [key: string]: string | number }])[]
  | readonly (readonly [string, { readonly [key: string]: string | number }])[];

declare module "@hugeicons/core-free-icons/*" {
  const icon: HugeiconsSvgObject;
  export default icon;
}
