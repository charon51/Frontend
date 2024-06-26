import { Link } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { VscTasklist } from "react-icons/vsc";

const RecipeDetail = ({ recipe }) => {
    if (recipe) {
        const {
            image,
            label,
            cuisineType,
            mealType,
            dishType,
            calories,
            yield: serving,
            ingredientLines,
            cautions,
            source,
            url,
            healthLabels,
            dietLabels
        } = recipe;

        return (
            <div className="p-5 flex flex-col gap-10">
                <div className="flex flex-col lg:flex-row justify-between gap-3">
                    <img src={image} alt="food" width={240} height={240} />
                    <div className="flex flex-col flex-1 justify-between">
                        <h1 className="text-orange-500 text-xl font-bold">{label}</h1>

                        <div className="flex justify-between items-center">
                            <h6 className="font-bold text-orange-300">Tipo de Cocina</h6>
                            <p>{cuisineType}</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <h6 className="font-bold text-orange-300">Tipo de Comida</h6>
                            <p>{mealType}</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <h6 className="font-bold text-orange-300">Tipo de Plato</h6>
                            <p>{dishType}</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <h6 className="font-bold text-orange-300">Calorias</h6>
                            <p>{Math.floor(calories / serving)} kcal/ración</p>
                        </div>

                        <div className="flex justify-between items-center">
                            <h6 className="font-bold text-orange-300">Fuente</h6>
                            <Link to={url} target="_blank" rel="noopener noreferrer" className="flex gap-1 items-center text-blue-500 hover:text-blue-700 font-bold">
                                {source}
                                <AiOutlineLink />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between gap-5">
                    <div className="flex flex-col flex-1">
                        <h2 className="text-lg font-bold text-orange-500">Ingredientes</h2>
                        {ingredientLines.map((line, index) => (
                            <p key={`${index}${line}`} className="text-sm">
                                <FontAwesomeIcon icon={faCheck} color="black" /> {line}
                            </p>
                        ))}
                    </div>
                    <div className="flex flex-col flex-1">
                        <h2 className="text-lg font-bold text-orange-500">Precauciones</h2>
                        {cautions?.length ? (
                            cautions.map(caution => (
                                <p key={`${caution}`} className="text-sm">
                                    <FontAwesomeIcon icon={faCheck} color="black" /> {caution}
                                </p>
                            ))
                        ) : (
                            <p>Sin Precauciones</p>
                        )}
                    </div>
                </div>
                <div className="flex justify-between gap-5">
                    <div className="flex flex-col flex-1">
                        <h2 className="text-lg font-bold text-orange-500">Etiqueta sanitaria</h2>
                        <div className="flex gap-1 flex-wrap">
                            {healthLabels.map(health => (
                                <div key={`${health}`} className="bg-lime-700 text-white px-2 py-1 text-xs rounded-full">{health}</div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col flex-1">
                        <h2 className="text-lg font-bold text-orange-500">Etiqueta de dieta</h2>
                        <div className="flex gap-1 flex-wrap">
                            {dietLabels.map(diet => (
                                <div key={`${diet}`} className="bg-green-700 text-white px-2 py-1 text-xs rounded-full">
                                    {diet}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col h-full justify-center items-center font-bold text-orange-500">
                <VscTasklist className="text-5xl" />
                <p>Seleccione una receta para ver detalles</p>
            </div>
        );
    }
};

export default RecipeDetail;