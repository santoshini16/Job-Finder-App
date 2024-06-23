const validateNewJob = (req, res, next) => {
    const { companyName, title, description, logoUrl, salary, location, duration, locationType, information, jobType, skills } = req.body;
    const refUserId = req.refUserId;
   console.log(refUserId)
    try {
        const parsedSalary = parseInt(salary);

        // Check for required fields
        if (!companyName || !title || !description || !logoUrl || !location || !duration || !locationType || !information || !jobType || !skills || !refUserId) {
            console.log('Missing required fields:', { companyName, title, description, logoUrl, location, duration, locationType, information, jobType, skills, refUserId });
            return res.status(400).json({
                message: 'Please provide all required fields',
            });
        }

        // Validate salary as a positive number
        if (isNaN(parsedSalary) || parsedSalary <= 0) {
            return res.status(400).json({
                message: 'Invalid salary',
            });
        }

        const validJobTypes = ["Full-Time", "Part-Time", "Internship"];
        const validLocationTypes = ["On-Site", "Remote", "Hybrid"];
        const validSkills = Array.isArray(skills) && skills.length > 0 && skills.every(skill => typeof skill === 'string');
        const validJobType = validJobTypes.includes(jobType);
        const validLogoUrl = logoUrl.match(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i);
        const validLocationType = validLocationTypes.includes(locationType);

        // Validate jobType
        if (!validJobType) {
            return res.status(400).json({
                message: 'Invalid job type',
            });
        }

        // Validate skills
        if (!validSkills) {
            return res.status(400).json({
                message: 'Invalid skills',
            });
        }

        // Validate logo URL
        if (!validLogoUrl) {
            return res.status(400).json({
                message: 'Invalid logo URL',
            });
        }

        // Validate location type
        if (!validLocationType) {
            return res.status(400).json({
                message: 'Invalid location type',
            });
        }

        // Check refUserId (assuming it's a MongoDB ObjectId)
        if (!refUserId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                message: 'Invalid refUserId',
            });
        }

        // Proceed to the next middleware if validation passes
        next();

    } catch (error) {
        next({
            message: "Error Adding Job",
            error: error
        });
    }
};

module.exports = validateNewJob;
