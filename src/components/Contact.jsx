import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Contact({ listing }) {
    const [landLord, setLandlord] = useState(null);
    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        setMessage(e.target.value);
    };
    useEffect(() => {
        const fetchLandLord = async () => {
            try {
                const res = await fetch(
                    `https://plotpe-mern-project.onrender.com/api/user/${listing.userRef}`,
                    {
                        credentials: "include",
                    }
                );
                const data = await res.json();
                if (data.success === false) {
                    console.log("Error in pulling landlord details");
                    return;
                }
                console.log("landlord details", data);
                setLandlord(data);
            } catch (err) {
                console.log("Error in pulling landlord details", err);
            }
        };
        

        fetchLandLord();
    }, [listing.userRef]);

    return (
        <>
            {landLord && (
                <div className="flex flex-col gap-2">
                    <p>
                        Contact <span className="font-semibold">{landLord.username}</span>{" "}
                        for{" "}
                        <span className="font-semibold">{listing.name.toLowerCase()}</span>
                    </p>
                    <textarea
                        name="message"
                        id="message"
                        rows="2"
                        value={message}
                        onChange={handleChange}
                        placeholder="Enter your message here..."
                        className="w-full border p-3 rounded-lg"
                    />
                    <Link
                        to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message} `}
                        className="bg-green-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
                    >
                        Send Message
                    </Link>
                </div>
            )}
        </>
    );
}
