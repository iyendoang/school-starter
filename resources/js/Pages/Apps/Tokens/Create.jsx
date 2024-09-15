import ButtonAction from "@/Components/ButtonAction";
import Card from "@/Components/Card";
import Input from "@/Components/Input";
import Select from "@/Components/Select";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { IconKey } from "@tabler/icons-react";
import toast from "react-hot-toast";
export default function Create({ applications = [], school }) {
  const { data, setData, post, processing, errors } = useForm({
    application_id: "",
    token_access: "",
    expired_at: "",
    status: true,
  });

  const saveToken = (e) => {
    e.preventDefault();
    post(`/apps/tokens/${school.data.id}`, {
      onSuccess: () => {
        toast("Token successfully saved", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#1C1F29",
            color: "#fff",
          },
        });
      },
    });
  };

  return (
    <>
      <Head title={"Add Token"} />
      <Card
        title={"Add Token"}
        icon={<IconKey size={20} strokeWidth={1.5} />}
        footer={
          <>
            <ButtonAction
              linkBack={"/apps/schools"}
              labelBack="Kembali"
              onProcessing={processing}
            />
          </>
        }
        form={saveToken}
      >
        <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="w-full md:w-1/2">
            <Select
              label="Select Application"
              value={data.application_id}
              onChange={(e) => setData("application_id", e.target.value)}
              errors={errors.application_id}
            >
              <option value="">Select Application</option>
              {applications?.data.length > 0 &&
                applications?.data.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.name}
                  </option>
                ))}
            </Select>
          </div>
          <div className="w-full md:w-1/2">
            <Input
              type={"text"}
              label={"Token Access"}
              value={data.token_access}
              onChange={(e) => setData("token_access", e.target.value)}
              errors={errors.token_access}
            />
          </div>
        </div>

        <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="w-full md:w-1/2">
            <Input
              type={"date"}
              label={"Expired At"}
              value={data.expired_at}
              onChange={(e) => setData("expired_at", e.target.value)}
              errors={errors.expired_at}
            />
          </div>
          <div className="w-full md:w-1/2">
            <Select
              label={"Status"}
              value={data.status}
              onChange={(e) =>
                setData("status", e.target.value === "true" ? true : false)
              } // Convert to boolean
              errors={errors.status}
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </Select>
          </div>
        </div>
      </Card>
    </>
  );
}
Create.layout = (page) => <AppLayout children={page} />;
