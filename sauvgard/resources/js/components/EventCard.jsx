const EventCard = () => {
    return (
        <div className="max-w-full">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl text-[#00bfff]">Évènements à venir</h1>
                <div className="flex gap-4">
                    <select className="bg-[#00bfff] text-white px-4 py-2 rounded-md">
                        <option>Filtrer par date</option>
                    </select>
                    <select className="bg-[#00bfff] text-white px-4 py-2 rounded-md">
                        <option>Filtrer par lieu</option>
                    </select>
                </div>
            </div>

            <div className="bg-[#00bfff] text-white rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold">Collect de dons (type d'évènement)</h2>
                    <button className="bg-white text-[#00bfff] px-6 py-2 rounded-full hover:bg-gray-100">
                        S'inscrire
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                    <div>Date</div>
                    <div>Heure début/fin</div>
                    <div>Adresse/lieu</div>
                </div>

                <div className="flex gap-6">
                    <div className="w-48">
                        <div className="w-48 h-48 bg-gray-200 rounded-lg mb-4"></div>
                        <div className="space-y-4">
                            <div>
                                <p className="font-semibold">Personne de contact :</p>
                                <p className="text-sm">nom | Email@unicef | Téléphone</p>
                            </div>
                            <div>
                                <p className="font-semibold">Co-voiturage possible :</p>
                                <p className="text-sm">(oui / non)</p>
                            </div>
                            <div>
                                <p className="font-semibold">Prévoir votre déjeuner :</p>
                                <p className="text-sm">(oui / non)</p>
                            </div>
                            <div>
                                <p className="font-semibold">Type de public:</p>
                                <p className="text-sm">Tout public, Familles, Enfants, Étudiants, Bénévoles, JA</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h3 className="font-semibold mb-2">Informations supplémentaires :</h3>
                        <p className="text-sm">
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
                            literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
                            College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum
                            passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                            Lorem reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
