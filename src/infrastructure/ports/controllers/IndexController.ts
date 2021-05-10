import { Get, JsonController } from 'routing-controllers';

import { version } from '../../../../package.json';

@JsonController()
class IndexController {
  @Get()
  index(): object {
    return { msg: 'Base API Projetc' };
  }

  @Get('/version')
  version(): object {
    return { version };
  }
}

export { IndexController };
