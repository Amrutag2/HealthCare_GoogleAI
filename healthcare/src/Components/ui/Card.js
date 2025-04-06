export default function Card({ children, className }) {
    return <div className={`border p-4 rounded shadow ${className}`}>{children}</div>;
}
