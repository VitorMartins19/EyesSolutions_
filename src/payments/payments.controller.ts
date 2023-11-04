import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    UseInterceptors,
    UseGuards,
  } from "@nestjs/common";
  import { ParamId } from "src/decorator/param-id.decorator";
  import { Roles } from "src/decorator/roles.decorator";
  import { Role } from "src/enums/role.enum";
  import { AuthGuard } from "src/guards/auth.guard";
  import { RoleGuard } from "src/guards/role.guard";
  import { LogInterceptor } from "src/interceptors/log.interceptor";
  import { CreatePayDTO } from "./dto/create-pay.dto";
  import { UpdatePatchPayDTO } from "./dto/update-patch.pay";
  import { UpdatePutPayDTO } from "./dto/update-put-pay";
  import { PayService } from "./payments.service";
  
  // @Roles(Role.Admin)
  // @UseGuards(AuthGuard, RoleGuard)
  // @UseInterceptors(LogInterceptor)
  @Controller("pay")
  export class PayController {
    constructor(private readonly PayService: PayService) {}
  
    //Guardo do throttler é para limitar a requisição da rota
    //Caso queira sobrescrever o que foi feito no throttler em app.module -> new ThrottlerGuard({args})
    //@UseGuards(ThrottlerGuard)
    @Post()
    async create(@Body() data: CreatePayDTO) {
      return this.PayService.create(data);
    }
  
    @Get()
    async read() {
      return this.PayService.list();
    }
  
    @Get(':pagamentos_id')
    async show(@Param('pagamentos_id', ParseIntPipe) pagamentos_id: number) {
      return this.PayService.show(pagamentos_id);
    }
  
    //Pode-se ser substituido o parseintpipe por @paramid
  
    @Put(":pagamentos_id")
    async update(
      @Body() data: UpdatePutPayDTO,
      @Param("pagamentos_id", ParseIntPipe) pagamentos_id: number,
    ) {
      return this.PayService.update(pagamentos_id, data);
    }
  
    @Patch(":pagamentos_id")
    async partialUpdate(
      @Body() data: UpdatePutPayDTO,
      @Param("pagamentos_id", ParseIntPipe) pagamentos_id,
    ) {
      return this.PayService.updatePartial(pagamentos_id, data);
    }
  
    @Delete(":pagamentos_id")
    async delete(@Param("pagamentos_id", ParseIntPipe) pagamentos_id: number) {
      return this.PayService.delete(pagamentos_id);
    }
  }
  