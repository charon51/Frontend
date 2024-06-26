import { useRef, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import { selectCurrentToken } from "../authSlice";
import { useRefreshMutation } from "../authApiSlice";
import usePersist from "../../../hooks/usePersist";

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);

    const [trueSuccess, setTrueSuccess] = useState(false);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError
    }] = useRefreshMutation();

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== "development") {
            const verifyRefreshToken = async () => {
                try {
                    await refresh();
                    setTrueSuccess(true);
                } catch (err) {
                    console.error(err);
                }
            };

            if (!token && persist) {
                verifyRefreshToken();
            }
        }

        return () => effectRan.current = true;
    }, [persist, refresh, token]);

    if (!persist) { // persist X
        return <Outlet />;
    } else if (isLoading) { // persist O, token X
        return (
            <div className="pt-[64px] h-[calc(100vh-76px)] flex justify-center items-center">
                <Oval
                    height={60}
                    width={60}
                    visible={true}
                    color="#ED8936" // orange-500
                    secondaryColor="#ED8936" // orange-500
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                />
            </div>
        );
    } else if (isError) { // persist O, token X
        return <Outlet />;
    } else if (isSuccess && trueSuccess) { // persist O, token O
        return <Outlet />;
    } else if (token && isUninitialized) { // persist O, token O
        return <Outlet />;
    }
};

export default PersistLogin;