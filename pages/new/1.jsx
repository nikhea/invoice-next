import { useForm,useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { DatePicker } from 'rc-calendar';

const invoiceSchema = yup.object().shape({
  id: yup.string().required('ID is required'),
  createdAt: yup.date().default(() => new Date()).required('Created at date is required'),
  paymentDue: yup.date().required('Payment due date is required'),
  description: yup.string().required('Description is required'),
  paymentTerms: yup.number().required('Payment terms are required'),
  clientName: yup.string().required('Client name is required'),
  clientEmail: yup.string().email('Invalid email').required('Client email is required'),
  status: yup.string().required('Status is required'),
  senderAddress: yup.object().shape({
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    postCode: yup.string().required('Post code is required'),
    country: yup.string().required('Country is required'),
  }).required('Sender address is required'),
  clientAddress: yup.object().shape({
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    postCode: yup.string().required('Post code is required'),
    country: yup.string().required('Country is required'),
  }).required('Client address is required'),
  items: yup.array().of(yup.object().shape({
    name: yup.string().required('Item name is required'),
    quantity: yup.number().required('Item quantity is required'),
    price: yup.number().required('Item price is required'),
    total: yup.number().required('Item total is required'),
  })).required('At least one item is required'),
  total: yup.number().required('Total is required'),
});

const  InvoiceForm = () => {
  const { register, handleSubmit,formState:{errors} ,control } = useForm({
    validationSchema: invoiceSchema
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        ID:
        <input name="id" ref={register} />
        {errors.id && <span>{errors.id.message}</span>}
      </label>
      <br />
      <label>
        Created At:
        <DatePicker name="createdAt" ref={register} />
        {errors.createdAt && <span>{errors.createdAt.message}</span>}
      </label>
      <br />
      <label>
        Payment Due:
        <DatePicker name="paymentDue" ref={register} />
        {errors.paymentDue && <span>{errors.paymentDue.message}</span>}
      </label>
      <br
      <label>
      Description:
      <input name="description" ref={register} />
      {errors.description && <span>{errors.description.message}</span>}
    </label>
    <br />
    <label>
      Payment Terms:
      <input name="paymentTerms" type="number" ref={register} />
      {errors.paymentTerms && <span>{errors.paymentTerms.message}</span>}
    </label>
    <br />
    <label>
      Client Name:
      <input name="clientName" ref={register} />
      {errors.clientName && <span>{errors.clientName.message}</span>}
    </label>
    <br />
    <label>
      Client Email:
      <input name="clientEmail" type="email" ref={register} />
      {errors.clientEmail && <span>{errors.clientEmail.message}</span>}
    </label>
    <br />
    <label>
      Status:
      <input name="status" ref={register} />
      {errors.status && <span>{errors.status.message}</span>}
    </label>
    <br />
    <fieldset>
      <legend>Sender Address</legend>
      <label>
        Street:
        <input name="senderAddress.street" ref={register} />
        {errors.senderAddress?.street && <span>{errors.senderAddress.street.message}</span>}
      </label>
      <br />
      <label>
        City:
        <input name="senderAddress.city" ref={register} />
        {errors.senderAddress?.city && <span>{errors.senderAddress.city.message}</span>}
      </label>
      <br />
      <label>
        Post Code:
        <input name="senderAddress.postCode" ref={register} />
        {errors.senderAddress?.postCode && <span>{errors.senderAddress.postCode.message}</span>}
      </label>
      <br />
      <label>
        Country:
        <input name="senderAddress.country" ref={register} />
        {errors.senderAddress?.country && <span>{errors.senderAddress.country.message}</span>}
      </label>
      <br />
    </fieldset>
    <fieldset>
      <legend>Client Address</legend>
      <label>
        Street:
        <input name="clientAddress.street" ref={register} />
        {errors.clientAddress?.street && <span>{errors.clientAddress.street.message}</span>}
      </label>
      <br />
      <label>
        City:
        <input name="clientAddress.city" ref={register} />
        {errors.clientAddress?.city && <span>{errors.clientAddress.city.message}</span>}
      </label>
      <br />
      <label>
       
      Post Code:
          <input name="clientAddress.postCode" ref={register} />
          {errors.clientAddress?.postCode && <span>{errors.clientAddress.postCode.message}</span>}
        </label>
        <br />
        <label>
          Country:
          <input name="clientAddress.country" ref={register} />
          {errors.clientAddress?.country && <span>{errors.clientAddress.country.message}</span>}
        </label>
        <br />
      </fieldset>
      <fieldset>
      <legend>Items</legend>
      <button type="button" onClick={() => {
        append({
          name: '',
          quantity: 0,
          price: 0,
          total: 0,
        });
      }}>Add Item</button>
      {fields.map((item, index) => (
        <div key={item.id}>
          <label>
            Name:
            <input name={`items[${index}].name`} ref={register} />
            {errors.items && errors.items[index] && errors.items[index].name && <span>{errors.items[index].name.message}</span>}
          </label>
          <br />
          <label>
            Quantity:
            <input name={`items[${index}].quantity`} type="number" ref={register} />
            {errors.items && errors.items[index] && errors.items[index].quantity && <span>{errors.items[index].quantity.message}</span>}
          </label>
          <br />
          <label>
            Price:
            <input name={`items[${index}].price`} type="number" ref={register} />
            {errors.items && errors.items[index] && errors.items[index].price && <span>{errors.items[index].price.message}</span>}
          </label>
          <br />
          <label>
            Total:
            <input name={`items[${index}].total`} type="number" ref={register} />
            {errors.items && errors.items[index] && errors.items[index].total && <span>{errors.items[index].total.message}</span>}
          </label>
          <br />
          <button type="button" onClick={() => {
            remove(index);
          }}>Delete Item</button>
        </div>
      ))}
    </fieldset>
      <label>
        Total:
        <input name="total" type="number" ref={register} />
        {errors.total && <span>{errors.total.message}</span>}
      </label>
      <br />
      <input type="submit" />
    </form>
  );
}

export default InvoiceForm
