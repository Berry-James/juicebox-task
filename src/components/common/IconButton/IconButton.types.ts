export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & Partial<{ size: IconButtonSize }>;

export type IconButtonSize = 'sm' | 'md' | 'lg' | 'xl';