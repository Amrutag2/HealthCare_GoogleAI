import { useState } from "react";
import axios from "axios";

const conditions = ["High Blood Pressure", "PCOS", "PCOD", "Thyroid", "Blood Sugar"];
const goals = ["Weight Loss", "Weight Gain", "Maintenance"];
const activityLevels = ["Low", "Moderate", "High"];

export default function DietaryPlan() {
    const [formData, setFormData] = useState({
        age: "",
        weight: "",
        condition: "",
        goal: "",
        activityLevel: ""
    });

    const [dietPlan, setDietPlan] = useState(null);

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchDietPlan = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/diet/diet`, formData);
            setDietPlan(response.data);
        } catch (error) {
            console.error("Error fetching diet plan:", error);
        }
    };

    return (
        <div className="dietary-container">
            <div className="form-card">
                <h2 className="form-title">Dietary Plan Generator</h2>

                <div className="form-group">
                    <label>Age</label>
                    <input
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter your age"
                    />
                </div>

                <div className="form-group">
                    <label>Weight (kg)</label>
                    <input
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter your weight"
                    />
                </div>

                <div className="form-group">
                    <label>Goal</label>
                    <select name="goal" value={formData.goal} onChange={handleChange}>
                        <option value="">-- Choose Goal --</option>
                        {goals.map((goal) => (
                            <option key={goal} value={goal}>{goal}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Condition</label>
                    <select name="condition" value={formData.condition} onChange={handleChange}>
                        <option value="">-- Choose Condition --</option>
                        {conditions.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Activity Level</label>
                    <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
                        <option value="">-- Choose Activity Level --</option>
                        {activityLevels.map((a) => (
                            <option key={a} value={a}>{a}</option>
                        ))}
                    </select>
                </div>

                <button className="submit-btn" onClick={fetchDietPlan}>Get Diet Plan</button>
            </div>

            {dietPlan && (
                <div className="diet-result">
                    <h3>Recommended Diet:</h3>
                    {dietPlan.recommendation.split("\n").map((line, idx) => {
                        const trimmed = line.trim();
                        if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
                            const cleanText = trimmed.replace(/\*\*/g, "");
                            return <h4 key={idx}>{cleanText}</h4>;
                        }
                        if (trimmed.startsWith("* ")) {
                            return <li key={idx}>{trimmed.replace("* ", "").replace(/\*\*/g, "")}</li>;
                        }
                        return <p key={idx}>{trimmed.replace(/\*\*/g, "")}</p>;
                    })}
                </div>
            )}
        </div>
    );
}
