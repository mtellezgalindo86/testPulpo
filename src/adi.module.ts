import { Module, CacheModule } from '@nestjs/common';
import { HumanitarianAidController } from './aid.controller';
import { HumanitarianAidService } from './aid.service';

const NodeCache = require('node-cache');

@Module({
  imports: [CacheModule.register({ stdTTL: 3600 })],
  controllers: [HumanitarianAidController],
  providers: [
    HumanitarianAidService,
    { provide: 'NodeCache', useValue: new NodeCache() },
  ],
})
export class ADIModule {}
