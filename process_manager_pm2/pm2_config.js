import pm2 from "pm2";

pm2.connect((err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    pm2.start(
        {
            script: "pm2_clusterise.js",
            exec_mode: "cluster",
            instances: 4,
            max_memory_restart: "100M"
        },
        (err, apps) => {
            pm2.disconnect();
            if (err) throw err;
        },  
    );
});