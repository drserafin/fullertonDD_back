app.get("/test-db", async (req, res) => {
    try {
        const result= await pool.query ('SELECT NOW()');
        res.send(result.rows[0]);
    } catch (error) {
        console.error('Error executing query', error.stack);
        res.status(500).send('Error executing query');
    }
});   