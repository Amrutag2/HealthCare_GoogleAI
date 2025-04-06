export default function Label({ children, className }) {
    return <label className={`block font-medium ${className}`}>{children}</label>;
}
