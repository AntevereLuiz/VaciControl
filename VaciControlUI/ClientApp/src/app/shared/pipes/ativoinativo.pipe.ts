import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ativoinativo'
})
export class AtivoInativoPipe implements PipeTransform {

  transform(value: boolean): any {
    if(value == null)
      return null;

      if(value)
        return 'Ativo';
      else
        return 'Inativo';
  }

}
