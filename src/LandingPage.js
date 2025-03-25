import React, { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";

function LandingPage() {
  const { user } = useAuth();
  const { slug } = useParams();

  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("exhibitors")
        .select("*")
        .eq("user_email", user.email)
        .single();

      if (!error) {
        setFormData(data);
      }
    };

    fetchData();
  }, [user]);

  const handleUpdate = async () => {
    await supabase
      .from("exhibitors")
      .update(formData)
      .eq("slug", slug);
    setIsEditing(false);
  };

  if (!formData) return <div style={{ padding: "2rem" }}>Loading...</div>;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      {isEditing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Page Title"
          />
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Promo Text"
          />
          <input
            value={formData.buttonText}
            onChange={(e) =>
              setFormData({ ...formData, buttonText: e.target.value })
            }
            placeholder="Button Label"
          />
          <input
            value={formData.buttonLink}
            onChange={(e) =>
              setFormData({ ...formData, buttonLink: e.target.value })
            }
            placeholder="Button Link"
          />
          <input
            value={formData.videoLink}
            onChange={(e) =>
              setFormData({ ...formData, videoLink: e.target.value })
            }
            placeholder="YouTube Embed Link"
          />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <>
          <h1>{formData.title}</h1>
          <p>{formData.description}</p>

          <div style={{ display: "flex", overflowX: "scroll", gap: "1rem", marginBottom: "1rem" }}>
            {Array.isArray(formData.images) &&
              formData.images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Image ${idx + 1}`}
                  style={{
                    width: "300px",
                    height: "auto",
                    borderRadius: "12px",
                    marginRight: "12px"
                  }}
                />
              ))}
          </div>

          {formData.videoLink && (
            <div style={{ marginBottom: "1rem" }}>
              <iframe
                width="100%"
                height="315"
                src={formData.videoLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <a href={formData.buttonLink} target="_blank" rel="noopener noreferrer">
            <button>{formData.buttonText}</button>
          </a>
        </>
      )}

      {user && (
        <div style={{ marginTop: "1rem" }}>
          <button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Cancel" : "Edit Page"}
          </button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;