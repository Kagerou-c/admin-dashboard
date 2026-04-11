'use client'

import card from "../components/card"
import { CheckCircle2, AlertCircle, Info } from "lucide-react"

export default function Summary({data}) {
    const { Card, CardContent } = card
    return (
        <div className="validation-summary-grid">
            <Card className="summary-stat valid">
                <CardContent>
                    <div className="stat-flex">
                        <div className="icon-box">
                            <CheckCircle2 size={20} color="#52ff86" />
                        </div>
                        <div>
                            <h4>Data Valid</h4>
                            <span>{data ? data.valid : 0} Baris</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="summary-stat invalid">
                <CardContent>
                    <div className="stat-flex">
                        <div className="icon-box">
                            <AlertCircle size={20} color="#ef4444" />
                        </div>
                        <div>
                            <h4>Data Invalid</h4>
                            <span>{data ? data.invalid : 0} Baris</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="summary-stat indices">
                <CardContent>
                    <div className="stat-flex">
                        <div className="icon-box">
                            <Info size={20} color="#3b82f6" />
                        </div>
                        <div>
                            <h4>Baris Bermasalah</h4>
                            <p className="indices-list">
                                Baris: {data ? data.invalidIndices.join(', ') : 0}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}