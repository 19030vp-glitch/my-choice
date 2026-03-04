import React from "react";
import useNIRFGetProgram from "../../../../../hooks/director-hooks/useNIRFGetProgram";
import { useSelector } from "react-redux";
import UserLoading from "../../../../../pages/UserLoading";
import { useParams } from "react-router-dom";
import programsByNIRF from "../js/programsByNIRF";
import Note from "../../academic-audit/components/Note";
import PlacemntAndHEForPriv3Year from "./PlacemntAndHEForPriv3Year";
import { NotAvailableComponentNIRF } from "./StudentIntake";

const PlacementHENIRF = () => {
  const { academicYear } = useParams();
  const user = useSelector((state) => state.user?.directorUser);
  const { programs, isLoading } = useNIRFGetProgram(user, academicYear);

  return (
    <div>
      {isLoading ? (
        <div>
          <UserLoading title="Getting Data" />
        </div>
      ) : programs && programs?.length > 0 ? (
        <div>
          <Note
            classes="bg-yellow-100 text-yellow-700 rounded-t-md p-2 mt-2"
            title="1. Sanctioned approved intake of 1st year to be entered"
          />
          <Note
            classes="bg-yellow-100 text-yellow-700 rounded-b-md p-2 mb-2"
            title="2. Enter value(s) in all the field(s):If not applicable enter zero[0]"
          />

          <div className="mt-5">
            {programs.map((item) => {
              const program = programsByNIRF[item];
              return (
                <div className="mx-1">
                  <PlacemntAndHEForPriv3Year
                    program={program}
                    academicYear={academicYear}
                    forYear={program.year}
                    school={user?.department}
                    type={item}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <NotAvailableComponentNIRF academicYear={academicYear} />
      )}
    </div>
  );
};

export default PlacementHENIRF;
