import axios from 'axios';

const BACKEND_ORIGIN_URL = 'http://localhost:3000';

const fetchJobs = async () => {
    try {
        const response = await axios.get(`${BACKEND_ORIGIN_URL}/job`);
        console.log('fetchJobs response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in fetchJobs:', error);
        throw error;
    }
};

const fetchJobsByQuery = async (query) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            title: query.title,
            skills: query.skills.join(','),
        },
    };

    try {
        const response = await axios.get(`${BACKEND_ORIGIN_URL}/job`, config);
        console.log('fetchJobsByQuery response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in fetchJobsByQuery:', error);
        throw error;
    }
};


const fetchJobById = async (id) => {
    try {
        const response = await axios.get(`${BACKEND_ORIGIN_URL}/job/${id}`);
        console.log('fetchJobById response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in fetchJobById:', error);
        throw error;
    }
};

const createJob = async (job) => {
    try {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(`${BACKEND_ORIGIN_URL}/job/add`, job, config);
        console.log('createJob response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in createJob:', error);
        throw error;
    }
};

export { fetchJobs, fetchJobsByQuery, fetchJobById, createJob };
