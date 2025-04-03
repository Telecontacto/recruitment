import { ChangeEvent, useState, useCallback, useEffect } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { getTranslation } from '@/app/translations';
import { updateExcercises } from '@/app/api/queryHandle/fetchApi';
import Modal from '@/app/ui/pipeline/modal';

interface ExercisesTabProps {
    solicitorId: any;
}

export default function ExercisesTab({ solicitorId }: ExercisesTabProps) {

    const { language } = useLanguage();
    const [isSaving, setIsSaving] = useState(false);
    // Modal configuration
    const [isModalOpen, setModalOpen] = useState(false);
    const [ModalMessage, setModalMessage] = useState('');
    const [ModalColor, setModalColor] = useState('');
    const [data, setData] = useState<{ [key: string]: any }>({
        solicitorId: solicitorId,
        gramatica1: '',
        gramatica2: '',
        gramatica3: '',
        gramatica4: '',
        gramatica5: '',
        gramatica6: '',
        gramatica7: '',
        gramatica8: '',
        gramatica9: '',
        gramatica10: '',
        gramatica11: '',
        gramatica12: '',
        gramatica13: '',
        gramatica14: '',
        gramatica15: '',
        gramatica16: '',
        gramatica17: '',
        gramatica18: '',
        gramatica19: '',
        gramatica20: '',
        llamada1_p1: '',
        llamada1_p2: '',
        llamada2_p1: '',
        llamada2_p2: '',
        llamada2_p3: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/interviewPipeline/excercises/fetchExcercises?id=${solicitorId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log('Fetched data:', result);
                setData({
                    ...data,
                    ...result[0]
                });
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, [solicitorId]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleInputBlur = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newInfo = {
            ...data,
            [name]: value
        };
        await saveChanges(newInfo);
    };

    const saveChanges = useCallback(async (newInfo: any) => {
        try {
            setIsSaving(true);
            await updateExcercises(newInfo);
            setModalMessage('Info Updated Successfully');
            setModalColor('bg-green-500');
            setModalOpen(true);
        } catch (error) {
            console.error('Failed to save personal info:', error);
        } finally {
            setIsSaving(false);
            setTimeout(() => {
                setModalOpen(false);
                setModalMessage('');
                setModalColor('');
            }, 2000);
        }
    }, [data.solicitorId]);


    // Grammar and spelling words - labels adjusted based on language
    const grammarWords = [
        { id: 'gramatica1', label: language === 'es' ? '1. comunicasion' : '1. comunication' },
        { id: 'gramatica2', label: language === 'es' ? '2. tranferensia' : '2. tranfer' },
        { id: 'gramatica3', label: language === 'es' ? '3. facturasion' : '3. biling' },
        { id: 'gramatica4', label: language === 'es' ? '4. renobasion' : '4. renewel' },
        { id: 'gramatica5', label: language === 'es' ? '5. resivio' : '5. resieve' },
        { id: 'gramatica6', label: language === 'es' ? '6. cuviertas' : '6. coverd' },
        { id: 'gramatica7', label: language === 'es' ? '7. responsabilidad' : '7. responzibility' },
        { id: 'gramatica8', label: language === 'es' ? '8. Polisa' : '8. polizy' },
        { id: 'gramatica9', label: language === 'es' ? '9. atrabez' : '9. thruogh' },
        { id: 'gramatica10', label: language === 'es' ? '10. organisasiones' : '10. organisazions' },
        { id: 'gramatica11', label: language === 'es' ? '11. elejivle' : '11. eligeble' },
        { id: 'gramatica12', label: language === 'es' ? '12. cooperatiba' : '12. cooperetive' },
        { id: 'gramatica13', label: language === 'es' ? '13. agente' : '13. ajent' },
        { id: 'gramatica14', label: language === 'es' ? '14. finnansiamiento' : '14. finansing' },
        { id: 'gramatica15', label: language === 'es' ? '15. interrez' : '15. interez' },
        { id: 'gramatica16', label: language === 'es' ? '16. recivido' : '16. recivied' },
        { id: 'gramatica17', label: language === 'es' ? '17. acecta' : '17. acepts' },
        { id: 'gramatica18', label: language === 'es' ? '18. prohivido' : '18. prohivited' },
        { id: 'gramatica19', label: language === 'es' ? '19. Rio Piedra Haight' : '19. Rio Pidra Heigts' },
        { id: 'gramatica20', label: language === 'es' ? '20. esfuerso' : '20. efort' },
    ];

    return (
        <div className="w-full text-gray-900 dark:text-white">
            <div className="p-6 mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {getTranslation('generalInstructions', language)}
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                    {getTranslation('readInstructions', language)}
                </p>
            </div>

            {/* Part 1: Grammar and Spelling */}
            <div className="p-6 mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {getTranslation('grammarSpelling', language)}
                </h2>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    {getTranslation('writeCorrectWord', language)}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {grammarWords.map((word) => (
                        <div key={word.id} className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                {word.label}
                            </label>
                            <input
                                type="text"
                                id={word.id}
                                name={word.id}
                                value={data[word.id] || ''}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Part 2: Case Discussion */}
            <div className="p-6 mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    {getTranslation('caseDiscussion', language)}
                </h2>

                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        {getTranslation('call1', language)}
                    </h3>

                    <div className="p-4 mb-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md">
                        <p className="text-gray-700 dark:text-gray-300">
                            {getTranslation('case1Description', language)}
                        </p>
                    </div>

                    <label className="block text-gray-900 dark:text-white font-medium mb-2">
                        {getTranslation('handleCall', language)}
                    </label>
                    <textarea
                        rows={6}
                        id="llamada1_p1"
                        name="llamada1_p1"
                        value={data.llamada1_p1 || ''}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full px-3 py-2 mb-5 border border-gray-300 dark:border-gray-600 rounded-md 
                                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />

                    <div className="p-4 mb-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md">
                        <p className="text-gray-700 dark:text-gray-300">
                            {getTranslation('case2Description', language)}
                        </p>
                    </div>

                    <label className="block text-gray-900 dark:text-white font-medium mb-2">
                        {getTranslation('handleCall', language)}
                    </label>
                    <textarea
                        rows={6}
                        id="llamada1_p2"
                        name="llamada1_p2"
                        value={data.llamada1_p2 || ''}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full px-3 py-2 mb-5 border border-gray-300 dark:border-gray-600 rounded-md 
                                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        {getTranslation('call2', language)}
                    </h3>

                    <div className="p-4 mb-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md">
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {getTranslation('case3Description', language)}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                            {getTranslation('serviceRepInfo', language)}
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                            <li>{getTranslation('phonePaymentsReflected', language)}</li>
                            <li>{getTranslation('systemIndicates', language)}</li>
                            <li>{getTranslation('paymentEvidence', language)}</li>
                        </ul>
                    </div>

                    <label className="block text-gray-900 dark:text-white font-medium mb-2">
                        {getTranslation('question1', language)}
                    </label>
                    <textarea
                        rows={6}
                        id="llamada2_p1"
                        name="llamada2_p1"
                        value={data.llamada2_p1 || ''}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full px-3 py-2 mb-5 border border-gray-300 dark:border-gray-600 rounded-md 
                                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />

                    <label className="block text-gray-900 dark:text-white font-medium mb-2">
                        {getTranslation('question2', language)}
                    </label>
                    <textarea
                        rows={6}
                        id="llamada2_p2"
                        name="llamada2_p2"
                        value={data.llamada2_p2 || ''}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full px-3 py-2 mb-5 border border-gray-300 dark:border-gray-600 rounded-md 
                                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />

                    <label className="block text-gray-900 dark:text-white font-medium mb-2">
                        {getTranslation('question3', language)}
                    </label>
                    <textarea
                        rows={6}
                        id="llamada2_p3"
                        name="llamada2_p3"
                        value={data.llamada2_p3 || ''}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        className="w-full px-3 py-2 mb-5 border border-gray-300 dark:border-gray-600 rounded-md 
                                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                </div>
            </div>
            <Modal
                message={ModalMessage}
                color={ModalColor}
                isOpen={isModalOpen} />
        </div>
    );
}
