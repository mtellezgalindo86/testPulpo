import {Controller, Get, Param} from '@nestjs/common';
import { HumanitarianAidService } from './aid.service';
import { ApiParam, ApiResponse, ApiOperation,ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class HumanitarianAidController {
    constructor(private readonly humanitarianAidService: HumanitarianAidService) {}

    @Get('aid-data/:countryKey/:year')
    @ApiOperation({ summary: 'Recuperar datos de ayuda humanitaria para un país y un año' })
    @ApiParam({ name: 'countryCode', description: 'El Codigo del pais que se quiere obtener' })
    @ApiParam({ name: 'year', description: 'El año que deseas consultar' })
    @ApiOkResponse({ description: 'Se regresa por año los datos del pais a consultar', type: Object })
    @ApiResponse({ status: 404, description: 'Datos no encontrados para el país y año especificados' })
    async getAidData(
        @Param('countryKey') countryKey: string,
        @Param('year') year: string
    ): Promise<any> {
        const aidData = await this.humanitarianAidService.getAidData(countryKey, year);

        let result = {};

        result=aidData;
        return result;
    }
}