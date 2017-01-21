#CLI LOG

##Usage

log=require('clilog');

log.print(1,'msg');

{
	Error: 0,
	Warn: 1,
	Info: 2,
	Debug: 3
}

log.error('msg');
log.warn('msg');
log.info('msg');
log.debug('msg');
