module.exports = {
    launch: {
        dumpio: true,
        headless: process.env.HEADLESS !== 'false',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
};
