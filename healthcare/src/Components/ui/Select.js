
export default function Select({ children, ...props }) {
    return <select className="border p-2 rounded" {...props}>{children}</select>;
}
