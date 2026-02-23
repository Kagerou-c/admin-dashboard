function Card({ className, children }) {

    return (
        <div className={className}>
            {children}
        </div>
    )
}

function CardHeder({ Title, Atribute }) {
    return (
        <div className="flex items-center justify-between" style={{ gap: '50px' }}>
            <p className="text-sm text-gray-500">{Title}</p>
            {Atribute}
        </div>
    )
}

function CardContent({ children }) {
    return (
        <>
            {children}
        </>
    )
}

export default { Card, CardContent, CardHeder }