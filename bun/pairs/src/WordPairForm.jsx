import React, { useState } from 'react';

const WordPairForm = () => {
    const [category, setCategory] = useState('');
    const [language1, setLanguage1] = useState('');
    const [language2, setLanguage2] = useState('');
    const [wordPairs, setWordPairs] = useState([{ language1Word: '', language2Word: '' }]);

    const handleWordChange = (index, field, value) => {
        const updatedWordPairs = [...wordPairs];
        updatedWordPairs[index][field] = value;
        setWordPairs(updatedWordPairs);
    };

    const addWordPair = () => {
        setWordPairs([...wordPairs, { language1Word: '', language2Word: '' }]);
    };

    const removeWordPair = (index) => {
        const updatedWordPairs = wordPairs.filter((_, i) => i !== index);
        setWordPairs(updatedWordPairs);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({ category, language1, language2, wordPairs });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="category_id" className="form-label">Category</label>
                <select
                    className="form-select"
                    id="category_id"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="" disabled>Select a category (optional)</option>
                    <option value="1">Animals</option>
                    <option value="2">Vehicles</option>
                </select>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="language_1" className="form-label">Language 1</label>
                        <select
                            className="form-select"
                            id="language_1"
                            value={language1}
                            onChange={(e) => setLanguage1(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a language</option>
                            <option value="1">English</option>
                            <option value="2">Finnish</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="language_2" className="form-label">Language 2</label>
                        <select
                            className="form-select"
                            id="language_2"
                            value={language2}
                            onChange={(e) => setLanguage2(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a language</option>
                            <option value="1">English</option>
                            <option value="2">Finnish</option>
                        </select>
                    </div>
                </div>
            </div>

            {wordPairs.map((pair, index) => (
                <div key={index} className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor={`language_1_word_${index}`} className="form-label">Word in Language 1</label>
                        <input
                            type="text"
                            className="form-control"
                            id={`language_1_word_${index}`}
                            value={pair.language1Word}
                            onChange={(e) => handleWordChange(index, 'language1Word', e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor={`language_2_word_${index}`} className="form-label">Word in Language 2</label>
                        <input
                            type="text"
                            className="form-control"
                            id={`language_2_word_${index}`}
                            value={pair.language2Word}
                            onChange={(e) => handleWordChange(index, 'language2Word', e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-12">
                        <button type="button" className="btn btn-danger btn-sm mt-2" onClick={() => removeWordPair(index)}>
                            Remove Word Pair
                        </button>
                    </div>
                </div>
            ))}

            <button type="button" className="btn btn-success btn-sm mt-2" onClick={addWordPair}>
                Add Word Pair
            </button>

            <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
    );
};

export default WordPairForm;
