import { IShowStatisticsTaskDTO } from '@application/tasks/dtos/IShowStatisticsTaskDTO';
import { ShowStatisticsService } from '@application/tasks/useCases/ShowStatisticsService';
import {
  Authorized,
  CurrentUser,
  Get,
  JsonController,
} from 'routing-controllers';
import { container } from 'tsyringe';

@JsonController('/statistics')
@Authorized()
class StatisticsController {
  @Get()
  async statistics(
    @CurrentUser() user_id: string,
  ): Promise<IShowStatisticsTaskDTO> {
    const service = container.resolve(ShowStatisticsService);
    const statistics = await service.execute(user_id);

    return statistics;
  }
}

export { StatisticsController };
