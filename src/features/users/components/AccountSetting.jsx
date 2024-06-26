import { Oval } from "react-loader-spinner";
import { BiSolidError } from "react-icons/bi";
import useAuth from "../../../hooks/useAuth";
import { useGetUserQuery } from "../usersApiSlice";
import { AccountSettingForm } from "./";

const AccountSetting = () => {
    const { id } = useAuth();

    const {
        data: user,
        isLoading,
        isSuccess,
        isError
    } = useGetUserQuery(id);

    if (isSuccess) {
        const { entities, ids } = user;
        const currentUser = entities[ids[0]];

        return (
            <div className="flex flex-col gap-10 py-10">
                <h2 className="text-orange-500 text-xl md:text-2xl lg:text-3xl font-black">
                Configuración de cuenta
                </h2>
                <AccountSettingForm user={currentUser} />
            </div>
        );
    } else if (isLoading) {
        return (
            <div className="flex flex-col gap-10 py-10">
                <h2 className="text-orange-500 text-xl md:text-2xl lg:text-3xl font-black">
                    Configuración de cuenta
                </h2>
                <div className="p-20 flex justify-center items-center">
                    <Oval
                        height={60}
                        width={60}
                        visible={true}
                        color="#ED8936"
                        secondaryColor="#ED8936"
                        strokeWidth={3}
                        strokeWidthSecondary={3}
                    />
                </div>
            </div>
        );
    } else if (isError) {
        return (
            <div className="flex flex-col gap-10 py-10">
                <h2 className="text-orange-500 text-xl md:text-2xl lg:text-3xl font-black">
                    Configuración de cuenta
                </h2>
                <div className="p-20 flex flex-col gap-1 justify-center items-center text-orange-700">
                    <BiSolidError className="text-5xl" />
                    <p className="font-bold">Ups... Se produjo un error...</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col gap-10 py-10">
                <h2 className="text-orange-500 text-xl md:text-2xl lg:text-3xl font-black">
                Configuración de cuenta
                </h2>
                <div className="p-20 flex flex-col gap-1 justify-center items-center text-orange-700">
                    <BiSolidError className="text-5xl" />
                    <p className="font-bold">Ups... No se pudo cargar...</p>
                </div>
            </div>
        );
    }
};

export default AccountSetting;