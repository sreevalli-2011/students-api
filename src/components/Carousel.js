import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1LL4ADnW6enkotmP-ijWBlV3QQoJlAF0DO6TG3HAH3vyGXQwxVaoE-yHKWHjtlsZ_wmlfp-Hs27uG/pub?output=csv";

const StudentCarousel = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csv) => {
        const rows = csv.split("\n").slice(1);

        const data = rows
          .filter((row) => row.trim() !== "" && row.split(",").length >= 5)
          .map((row, index) => {
            const cols =
              row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];

            let imageUrl = (cols[4] || "").replace(/"/g, "").trim();

            if (imageUrl.includes("drive.google.com")) {
              const fileId =
                imageUrl.split("/d/")[1]?.split("/")[0] ||
                imageUrl.split("id=")[1];

              if (fileId) {
                imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
              }
            }

            return {
              id: cols[0]?.replace(/"/g, "") || index + 1,
              name: cols[1]?.replace(/"/g, "") || "Student",
              course: cols[2]?.replace(/"/g, "") || "N/A",
              year: cols[3]?.replace(/"/g, "") || "N/A",
              image: imageUrl,
            };
          });

        setStudents(data);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="container my-4">
      <Slider {...settings}>
        {students.map((student) => (
          <div key={student.id}>
            <div className="bg-light rounded-4 p-3 p-md-4">
              <div className="row align-items-center text-center text-md-start g-3">

                {/* LEFT IMAGE */}
                <div className="col-12 col-md-4 d-flex justify-content-center">
                  <img
                    src={process.env.PUBLIC_URL + (student.image || "/images/im-1.jpg")}
                    alt={student.name}
                    className="img-fluid rounded-3"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        process.env.PUBLIC_URL + "/images/im-1.jpg";
                    }}
                  />
                </div>

                {/* RIGHT CONTENT */}
                <div className="col-12 col-md-8">
                  <h3 className="mb-2">{student.name}</h3>
                  <p className="mb-1">
                    <strong>Course:</strong> {student.course}
                  </p>
                  <p className="mb-1">
                    <strong>Year:</strong> {student.year}
                  </p>
                  <p className="mb-0">
                    <strong>ID:</strong> {student.id}
                  </p>
                </div>

              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StudentCarousel;
