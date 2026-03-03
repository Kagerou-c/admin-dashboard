function Card({ className, children }) {

    return (
        <div className={className}>
            {children}
        </div>
    )
}

function CardHeder({ Title, Atribute, Name, className }) {
    return (
        <div className={Name? Name : "flex items-center justify-between"} style={{ gap: '50px' }}>
            <h3 className={className? className : "card-header-title"}>{Title}</h3>
            {Atribute}
        </div>
    )
}

function CardContent({ children, Name }) {
    return (
        <div className={Name? Name : ""}>
            {children}
        </div>
    )
}


export default { Card, CardContent, CardHeder }