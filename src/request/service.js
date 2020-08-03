import service from './request'

export default config => {
        return service ({
                url: `${config.url}`,
                method: config.method,
                headers: config.headers,
                data: config.data || {},
                dataFlag: config.dataFlag
        })
}

