type LabelProps = {
  children: React.ReactNode;
};

const Label = ({ children }: LabelProps) => {
  return <label className=" text-left font-semibold text-lg">{children}</label>;
};

export default Label;
