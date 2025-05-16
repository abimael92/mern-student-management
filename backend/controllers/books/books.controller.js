import fetch from 'node-fetch';

export const getTextbooks = async (req, res) => {
    try {
        const response = await fetch('https://open.umn.edu/opentextbooks/textbooks.json');
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching textbooks:', err);
        res.status(500).json({ error: 'Failed to fetch textbooks' });
    }
};

