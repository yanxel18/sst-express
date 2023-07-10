module.exports = {
  apps : [{
    script: 'script.js',
	name: 'SST-EXPRESS',
	exp_backoff_restart_delay: 100,
	watch: true, 
	instances : 1,
	exec_mode: 'cluster',
  }]
}; 