import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";

export function ContactForm(props: any) {
  const { data: record, isCreating, setIsFormDisabled, isFormDisabled } = props;

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [isLoadingSave, setIsLoadingSave] = useState(false);

  const onCancel = () => {
    setIsFormDisabled(false);
  };

  const onSubmit = async (data: any, id: string = "") => {
    setIsLoadingSave(true);
    console.log({ id, data });
    try {
      if (id) {
        await axios({
          method: "put",
          url: `${process.env.NEXTAUTH_URL}/api/contacts/${id}`,
          data,
        });

        setIsFormDisabled(true);
      } else {
        await axios({
          method: "post",
          url: `${process.env.NEXTAUTH_URL}/api/contacts`,
          data,
        }).then((res) => {
          router.push(
            `${process.env.NEXTAUTH_URL}/contacts/${res?.data?.data?.id}`
          );
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingSave(false);
    }
  };

  useEffect(() => {
    if (record) {
      setValue("name", record.name);
      setValue("phone", record.phone);
      setValue("email", record.email);
    }
  }, [record]);

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, record?.id))}
      className="flex flex-col gap-4"
    >
      <div className="w-full">
        <label htmlFor="name">Name</label>
        <input
          disabled={isFormDisabled}
          className="border border-black rounded-sm w-full px-2 py-1"
          type="text"
          {...register("name")}
        />
        {errors.name && <span>This field is required</span>}
      </div>
      <div className="w-full">
        <label htmlFor="phone">Phone</label>
        <input
          disabled={isFormDisabled}
          className="border border-black rounded-sm w-full px-2 py-1"
          type="text"
          {...register("phone")}
        />
        {errors.phone && <span>This field is required</span>}
      </div>
      <div className="w-full">
        <label htmlFor="email">Email</label>
        <input
          disabled={isFormDisabled}
          className="border border-black rounded-sm w-full px-2 py-1"
          type="text"
          {...register("email")}
        />
        {errors.email && <span>This field is required</span>}
      </div>
      {!isFormDisabled && (
        <div className="w-full text-right mt-2 flex gap-2 justify-end">
          {!isCreating && (
            <button
              type="submit"
              className="border border-black rounded-sm w-24 px-2 py-1"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="border border-black rounded-sm w-24 px-2 py-1"
            disabled={isLoadingSave}
          >
            Save
          </button>
        </div>
      )}
    </form>
  );
}
