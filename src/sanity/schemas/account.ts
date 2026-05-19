const account = {
  name: "account",
  title: "Account",
  type: "document",
  fields: [
    {
      name: "accountNumber",
      title: "Account Number",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "owner",
      title: "Owner",
      type: "reference",
      to: [{ type: "user" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "balance",
      title: "Balance",
      type: "number",
      initialValue: 0,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "USD",
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
    {
      name: "accountStatus",
      title: "Account Status",
      type: "string",
      options: {
        list: [
          { title: "Pendiente", value: "pending" },
          { title: "Aprobada", value: "approved" },
          { title: "Validación Pendiente", value: "validation_pending" },
          { title: "Completada", value: "completed" },
        ],
        layout: "radio",
      },
      initialValue: "validation_pending",
    },
  ],
};

export default account;
